package main

import (
    "fmt"
    "../utils"
    "strings"
    "strconv"
    "regexp"
)

func set_bit(source *int64, at int) {
    *source |= (1 << at)
}

func clear_bit(source *int64, at int) {
    *source &= ^(1 << at)
}

func apply_mask(mask string, val int64) int64 {
    for i, char := range mask {
        if string(char) == "1" {
            set_bit(&val, len(mask) - 1-  i)   
        } else if string(char) == "0" {
            clear_bit(&val, len(mask) - 1-  i)
        }
    }
    return val
}

func part1(commands []string) {
    mem_map := map[string]int64{}
    var mask string
    mem_slot_regex, _ := regexp.Compile("mem\\[(\\d*)\\]")

    for _, command := range commands {
        split_command := strings.Split(command, " = ")
        if split_command[0] == "mask" {
            mask = split_command[1]
            continue
        }
        mem_slot := mem_slot_regex.FindStringSubmatch(split_command[0])[1]
        val, _ := strconv.ParseInt(split_command[1], 10, 64)
        mem_map[mem_slot] = apply_mask(mask, val)
    }

    var combined_value int64
    for _, val := range mem_map {
        combined_value += int64(val)
    }
    fmt.Println(combined_value)
}

func get_mem_slots(mem_slot int64, mask string) []int64 {
    mem_slots := []int64{mem_slot}
    for i, char := range mask {
        bit_to_set := len(mask) - 1-  i
        if string(char) == "X" {
            for j, _ := range mem_slots {
                root_slot := mem_slots[j]
                set_bit(&root_slot, bit_to_set)
                mem_slots[j] = root_slot
                clear_bit(&root_slot, bit_to_set)
                mem_slots = append(mem_slots, root_slot)
            }
        } else if string(char) == "1" {
            for j, _ := range mem_slots {
                set_bit(&mem_slots[j], bit_to_set)
            }
        }
    }
    return mem_slots
}

func part2(commands []string) {
    mem_map := map[int64]int64{}
    var mask string
    mem_slot_regex, _ := regexp.Compile("mem\\[(\\d*)\\]")

    for _, command := range commands {
        split_command := strings.Split(command, " = ")
        if split_command[0] == "mask" {
            mask = split_command[1]
            continue
        }
        mem_slot, _:= strconv.ParseInt(mem_slot_regex.FindStringSubmatch(split_command[0])[1], 10, 64)
        val, _ := strconv.ParseInt(split_command[1], 10, 64)
        for _, decoded_slot := range get_mem_slots(mem_slot, mask) {
            mem_map[decoded_slot] = val
        }
    }
    
    var combined_value int64
    for _, val := range mem_map {
        combined_value += int64(val)
    }
    fmt.Println(combined_value)
}

func main() {
    commands := utils.Readlines_as_string_array("input")
    part1(commands)
    part2(commands)
}