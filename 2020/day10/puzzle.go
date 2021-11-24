package main

import (
    "fmt"
    "../utils"
    "sort"
)

func part1(adapters []int64) {
    var prev, one_diff, three_diff int64

    for _, adapter := range adapters {
        if adapter - prev == 1 {
            one_diff++
        } else if adapter - prev == 3 {
            three_diff++
        } else {
            //don't care about 2 diffs
        }
        prev = adapter
    }
    fmt.Println(one_diff * three_diff)
}

func find_branch_splits(adapters []int64) (map[int64][]int64, []int64) {
    split_map := map[int64][]int64{}
    keys := []int64{}
    for idx, adapter := range adapters {
        possible_children := []int64{}
        for i := idx + 1; i < len(adapters); i++ {
            if adapters[i] - adapter <= 3{
                possible_children = append(possible_children, adapters[i])
            }
        }
        if 1 < len(possible_children) {
            split_map[adapter] = possible_children
            keys = append(keys, adapter)
        }
    }

    return split_map, keys
}

func part2(adapters []int64) {
    split_map, keys := find_branch_splits(adapters)
    new_branches_per_split := [][]int64{}
    for _, key := range keys {
        children := split_map[key]
        keys_to_remove := []int64{}
        for _, child := range children {
            if utils.Element_in_slice(child, keys) {
                replacement := split_map[child]
                for id, ele := range children {
                    if ele == child {
                        children[id] = replacement[0]
                        children = append(children, replacement[1:]...)
                    }
                }
                keys_to_remove = append(keys_to_remove, child)
            }
        }
        for _, remove := range keys_to_remove {
            split_map[remove] = nil
        }
        new_branches_per_split = append(new_branches_per_split, children)
    }
    count := 1
    for _, branches := range new_branches_per_split {
        if len(branches) > 0 {
            count *= len(branches)
        }
    }
    fmt.Println(count)
}


func main() {
    adapters := utils.Readlines_as_int_array("input")
    adapters = append(adapters, 0)

    sort.Slice(adapters, func(i,j int) bool { return adapters[i] < adapters[j]})
    adapters = append(adapters, adapters[len(adapters) -1] + 3)

    part1(adapters)
    part2(adapters)
}