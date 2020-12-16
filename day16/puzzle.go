package main

import (
    "fmt"
    "../utils"
    "strings"
    "strconv"
)

type Valid_range struct {
    min int64
    max int64
}

type Rule struct {
    name string
    valid_ranges []Valid_range
}

func get_rules_and_tickets(ticket_data []string) ([]Rule, [][]int64) {
    tickets := [][]int64{}
    rules := []Rule{}
    handling := "rules"

    for _, ticket := range ticket_data {
        if ticket == "" {
            continue
        }
        if ticket == "your ticket:"  || ticket == "nearby tickets:" {
            handling = "ticket"
            continue
        }
        switch handling {
            case "rules":
                rule := strings.Split(ticket,": ")
                rule_name := rule[0]
                var rule_ranges []Valid_range
                for _, item := range strings.Split(rule[1], " or ") {
                    r := strings.Split(item, "-")
                    minmax := utils.String_slice_to_int64_slice(r)
                    rule_ranges = append(rule_ranges, Valid_range{minmax[0], minmax[1]})
                }
                rules = append(rules, Rule{ rule_name, rule_ranges})
            case "ticket":
                var val_array []int64
                for _, val := range strings.Split(ticket, ",") {
                    int_val, _ := strconv.ParseInt(val, 10, 64)
                    val_array = append(val_array, int_val)
                }
                tickets = append(tickets,val_array)
        }
    }
    return rules, tickets 
}

func is_value_valid_for_a_rule(val int64, rule Rule) bool {
    for _, valid_range := range rule.valid_ranges {
        if utils.Is_in_range(valid_range.min, valid_range.max, val) {
            return true
        }
    }
    return false
}

func is_ticked_valid(ticket []int64, rules []Rule) (bool, []int64) {
    invalid_numbers := []int64{}
    for _, val := range ticket {
        is_valid := false
        for _, rule := range rules {
            if is_value_valid_for_a_rule(val, rule) {
                is_valid = true
                break
            }
        }
        if !is_valid {
            invalid_numbers = append(invalid_numbers, val)
        }
    }

    return len(invalid_numbers) == 0, invalid_numbers

}

func part1(rules []Rule, tickets [][]int64) {
    answer := []int64{}
    for _, ticket := range tickets {
        is_valid, invalid_numbers := is_ticked_valid(ticket, rules)
        if (!is_valid) {
            answer = append(answer, invalid_numbers...)
        }
    }
    fmt.Println(utils.Sum_slice(answer))
}

func remove_rule_from_all_other_indices(rule_name string, index_to_keep int, rules map[int][]string) int{
    nr_removed := 0
    for i, _ := range rules {
        if i == index_to_keep || len(rules[i]) == 1{
            continue
        }
        index_to_remove := utils.Find_index_of_string_in_slice(rule_name, rules[i])
        if index_to_remove != -1 {
            rules[i] = append(rules[i][:index_to_remove], rules[i][index_to_remove +1:]...)
            nr_removed++
        }
    }
    return nr_removed
}

func part2(rules []Rule, tickets [][]int64) {
    mapped_rule := map[int][]string{}
    valid_tickets := [][]int64{}
    for _, ticket := range tickets {
        is_valid, _ := is_ticked_valid(ticket, rules)
        if is_valid {
            valid_tickets = append(valid_tickets, ticket)
        }
    }
    all_rules := []string{}
    for _, rule := range rules {
        all_rules = append(all_rules, rule.name)
    }
    for i := 0; i< len(valid_tickets[0]); i++ {
        mapped_rule[i] = make([]string, len(all_rules))
        copy(mapped_rule[i], all_rules)
    }

    for _, ticket := range valid_tickets {
        for i, val := range ticket {
            for _, rule := range rules {
                if !utils.Element_in_slice(rule.name, mapped_rule[i]) {
                    continue
                }
                if !is_value_valid_for_a_rule(val, rule) {
                    index_to_remove := utils.Find_index_of_string_in_slice(rule.name, mapped_rule[i])
                    mapped_rule[i] = append(mapped_rule[i][:index_to_remove], mapped_rule[i][index_to_remove +1:]...)
                    if len(mapped_rule[i]) == 1 {
                        remove_rule_from_all_other_indices(mapped_rule[i][0], i, mapped_rule)
                        nr_changed := 1
                        for nr_changed != 0 {
                            nr_changed = 0
                            for j, _ := range ticket {
                                if len(mapped_rule[j]) == 1 {
                                    nr_removed := remove_rule_from_all_other_indices(mapped_rule[j][0], j, mapped_rule)
                                    if nr_removed != 0 {
                                        nr_changed++
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        }
    }
    tot := int64(1)
    for key, rule := range mapped_rule {
        if strings.Split(rule[0], " ")[0] == "departure" {
            tot *= tickets[0][key]
        }
    }
    fmt.Println(tot)
}

func main() {
    ticket_data := utils.Readlines_as_string_array("input")

    rules, tickets := get_rules_and_tickets(ticket_data)
    part1(rules, tickets)
    part2(rules, tickets)
}