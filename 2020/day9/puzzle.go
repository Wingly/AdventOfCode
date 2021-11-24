package main

import (
    "fmt"
    "../utils"
)

const input string = "input"
const preamble_length int = 25

func find_invalid_number(number_series []int64) int64 {
    for i := 0; i < len(number_series) - preamble_length; i++ {
        preamble := number_series[i: preamble_length +i]
        number_to_check := number_series[i + preamble_length]
        if !utils.Contains_combination(number_to_check, preamble) {
            return number_to_check
        }
    }
    return -1
}

func part1(number_series []int64) {
    fmt.Println(find_invalid_number(number_series))
}

func part2(number_series []int64) {
    invalid_number := find_invalid_number(number_series)
    first_num := 0
    max_int := int64(^uint(0) >> 1)
    weakness := [2]int64{max_int, - max_int}
    for i := 1; i < len(number_series); {
        consider_slice := number_series[first_num:i]
        sum := utils.Sum_slice(consider_slice)
        if sum < invalid_number {
            i++
        } else if invalid_number < sum {
            first_num++
        } else {
            for _, val := range consider_slice {
                if val < weakness[0] {
                    weakness[0] = val
                } 
                if weakness[1] < val {
                    weakness[1] = val
                }
            }
            break
        }
    }
    fmt.Println(utils.Sum_slice(weakness[:]))
}

func main() {
    number_series := utils.Readlines_as_int_array(input)
    part1(number_series)
    part2(number_series)
}