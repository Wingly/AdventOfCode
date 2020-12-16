package main

import (
    "fmt"
    "../utils"
)

func find_last_number_after_iteration(numbers []int64, iterations int64) {
    number_store := map[int64]int64{}

    last_num := numbers[len(numbers) -1]
    var last_mentioned int64
    for i, num := range numbers {
        number_store[num] = int64(i +1)
    }

    for i := int64(len(numbers)) ; i < iterations; i++ {
        number_store[last_num] = i
        if last_mentioned != 0 {
            last_num = i - last_mentioned
        } else {
            last_num = 0
        }
        last_mentioned = number_store[last_num]
    }

    fmt.Println(last_num)
}

func part1(numbers []int64) {
    find_last_number_after_iteration(numbers, 2020)
}

func part2(numbers []int64) {
    find_last_number_after_iteration(numbers, 30000000)
}


func main() {
    numbers := utils.Readlines_with_separator_as_int_array("input", ",")

    part1(numbers)
    part2(numbers)
}