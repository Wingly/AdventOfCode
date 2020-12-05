package main

import (
    "fmt"
    "../utils"
    "strings"
    "regexp"
    "strconv"
)

func clean_passport_data(raw_data []string) []string {
    passports := []string{}
    entry := 0
    for _, data := range raw_data {
        if data == "" {
            entry += 1
            continue
        }
        if len(passports) == entry {
            passports = append(passports, data)
        } else {
            passports[entry] += " " + data
        }
    }
    return passports
}

func has_all_required_fields(passport string) bool {
    required_fields := []string{"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", /* "cid"*/ }
    for _, field := range required_fields {
        if !strings.Contains(passport, field) {
            return false
        }
    }
    
    return true
}

func part1(passports []string) {
    valid_passports := 0
    for _, passport := range passports {
        if has_all_required_fields(passport) {
            valid_passports+=1
        }
    }
    fmt.Println(valid_passports)
}

func part2(passports []string) {
    var range_validation = map[string][]int64 {
        "byr": []int64{1920, 2002},
        "iyr": []int64{2010, 2020}, 
        "eyr": []int64{2020, 2030},
    }
    var regex_validation = map[string]string {
        "hcl": "^#(\\d|[a-f]){6}$",
        "ecl": "^(amb|blu|brn|gry|grn|hzl|oth)$",
        "pid": "^\\d{9}$",
    }
    valid_passports := len(passports)
    for _, passport := range passports {
        if !has_all_required_fields(passport) {
            valid_passports -= 1
            continue
        }
        for _, field := range strings.Fields(passport) {
            parts := strings.Split(field, ":")
            if len(range_validation[parts[0]]) != 0 {
                num_range := range_validation[parts[0]]
                value, err := strconv.ParseInt(parts[1], 10, 32)
                if err != nil || !utils.Is_in_range(num_range[0], num_range[1], value) {
                    valid_passports -= 1
                    break
                }
            } else if regex_validation[parts[0]] != "" {
                match, err := regexp.MatchString(regex_validation[parts[0]], parts[1])
                if err != nil || match == false {
                    valid_passports -=1
                    break
                }
            } else if parts[0] == "hgt" {
                unit := parts[1][len(parts[1])- 2:]
                value, err := strconv.ParseInt(parts[1][:len(parts[1])- 2], 10, 32)
                if err != nil ||
                 (unit == "cm" && !utils.Is_in_range(150, 193, value)) ||
                 (unit == "in" && !utils.Is_in_range(59, 76, value)) {
                    valid_passports -=1
                    break
                } 
            }
        }
    }
    fmt.Println(valid_passports)
}

func main() {
    passports_raw := utils.Readlines_as_string_array("input")
    if passports_raw == nil {
        return
    }
    passports := clean_passport_data(passports_raw)
    part1(passports)
    part2(passports)

}