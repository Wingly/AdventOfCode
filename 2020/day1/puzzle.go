package main

import (
    "../utils"
    "fmt"
)

func part1(balance_sheet []int64) int64 {
    for i := 0; i < len(balance_sheet); i++ {
        for j:= 1; j < len(balance_sheet) ; j++ {
            if balance_sheet[i] + balance_sheet[j] == 2020 {
                return balance_sheet[i] * balance_sheet[j]
            }
        }
    }
    return -1
}

func part2(balance_sheet []int64) int64 {
    for i := 0; i < len(balance_sheet); i++ {
        for j := 1; j < len(balance_sheet) ; j++ {
            if balance_sheet[i] + balance_sheet[j] < 2020 {
                for k := j+1; k < len(balance_sheet); k++  {
                    if balance_sheet[i] + balance_sheet[j] + balance_sheet[k] == 2020 {
                        return balance_sheet[i] * balance_sheet[j] * balance_sheet[k]
                    }
                }
            }
        }
    }
    return -1
}

func main()  {
    balance_sheet := utils.Readlines_as_int_array("input")
    if balance_sheet == nil {
        return
    }

    fmt.Println(part1(balance_sheet))
    fmt.Println(part2(balance_sheet))
    return
}