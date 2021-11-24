package main

import (
    "../utils"
    "fmt"
    "strings"
    "strconv"
)

type Bag_item struct {
    bag_type string
    count int
}

func find_bags_that_contain_target_bag(rules_map map[string][]Bag_item, bag_type string) []string {
    contains_bag_type := []string{}
    parent_bags := []string{}
    for key, bags := range rules_map {
        for _, bag := range bags {
            if bag_type == bag.bag_type {
                contains_bag_type = append(contains_bag_type, key)
            }
        }
    }
    for _, bag := range contains_bag_type {
        parent_bags = append(parent_bags, find_bags_that_contain_target_bag(rules_map, bag)...)
    }
    return append(contains_bag_type, parent_bags...)
}

func find_number_of_bags_in_bag(rules_map map[string][]Bag_item, bag_type string) int {
    child_bags := rules_map[bag_type]
    total_bags := 0
    for _, bag := range child_bags {
        total_bags += bag.count + bag.count * find_number_of_bags_in_bag(rules_map, bag.bag_type)
    }
    return total_bags
}

func part1(rules_map map[string][]Bag_item) {
    bags := find_bags_that_contain_target_bag(rules_map, "shinygold")
    fmt.Println(len(utils.Unique_items(bags)))
}

func part2(rules_map map[string][]Bag_item) {
    fmt.Println(find_number_of_bags_in_bag(rules_map, "shinygold"))
}

func main() {
    rules := utils.Readlines_as_string_array("input")

    rules_map := map[string][]Bag_item{}
    for _, rule := range rules {
        split_rule := strings.Fields(rule)
        key := strings.Join(split_rule[:2], "")
        inside_bags := []Bag_item{}
        for idx, word := range split_rule {
            if _, err := strconv.Atoi(word); err == nil {
                bag_count, _ := strconv.Atoi(split_rule[idx])
                bag_type := strings.Join(split_rule[idx +1:idx+3], "")
                inside_bags = append(inside_bags, Bag_item{bag_type, bag_count})
            }
        }
        rules_map[key] = inside_bags
    }
    part1(rules_map)
    part2(rules_map)

}