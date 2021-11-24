package main

import (
    "../utils"
    "fmt"
    "strings"
    "strconv"
)

func string_array_to_int_array(string_array []string) []int {
    int_array := []int{}
    for i := 0; i < len(string_array); i++ {
        int_value, _ := strconv.ParseInt(string_array[i], 10, 32)
        int_array = append(int_array, int(int_value))
    }
    return int_array
}

func part1(passwords []string) {
    var valid_passwords int

    for _, pw := range passwords {
        parts := strings.Fields(pw)
        char := string(parts[1][0])
        num_chars := string_array_to_int_array(strings.Split(parts[0], "-"))
        occurences := strings.Count(parts[2], char)
        if num_chars[0] <= occurences && occurences <= num_chars[1] {
            valid_passwords += 1
        } 
    }
    fmt.Println(valid_passwords)
}

func part2(passwords []string) {
    var valid_passwords int

    for _, pw := range passwords {
        parts := strings.Fields(pw)
        char := string(parts[1][0])
        char_indices := string_array_to_int_array(strings.Split(parts[0], "-"))
        occurences := 0
        for i := 0; i < 2; i++ {
            if string(parts[2][char_indices[i] -1]) == char {
                occurences += 1
            }
        }
        if occurences == 1 {
            valid_passwords += 1
        }
    }
    fmt.Println(valid_passwords)
}

func main() {
    passwords := utils.Readlines_as_string_array("input")
    if passwords == nil {
        return
    }
    part1(passwords)
    part2(passwords)
}