package utils

import (
    "fmt"
    "strconv"
)

func Is_in_range(min int64, max int64, value int64) bool {
    return min <= value && value <= max
}

func Unique_items(slice []string) []string {
    unique := []string{}
    for _, item := range slice {
        found_item := false
        for _, uniq_item := range unique {
            if item == uniq_item {
                found_item = true
                break
            }
        }
        if !found_item {
            unique = append(unique, item)
        }
    }
    return unique
}

func Element_in_slice(element interface{}, slice interface{}) bool {
    switch v := element.(type) {
    case int:
        return int_in_slice(element.(int), slice.([]int))
    case int64:
        return int64_in_slice(element.(int64), slice.([]int64))
    case string:
        return Find_index_of_string_in_slice(element.(string), slice.([]string)) != -1
    default:
        fmt.Println("Function not implemented for " + v.(string))
    }
    return false;
}

func int64_in_slice(element int64, slice []int64) bool {
    for _, item := range slice {
        if item == element {
            return true
        }
    }
    return false
}

func int_in_slice(element int, slice []int) bool {
    for _, item := range slice {
        if item == element {
            return true
        }
    }
    return false
}

func Contains_combination(combination int64, slice []int64) bool {
    for i := 0; i < len(slice); i++ {
        for j:= 1; j < len(slice) ; j++ {
            if slice[i] + slice[j] == combination {
                return true
            }
        }
    }
    return false
}

func Sum_slice(slice []int64) int64 {
    var ret_val int64
    for _, i := range slice {
        ret_val += i
    }
    return ret_val
}

func String_slice_to_int64_slice(slice []string) []int64 {
    int_slice := make([]int64, len(slice))
    for i, s := range slice {
        val, _ := strconv.ParseInt(s, 10, 64)
        int_slice[i] = val
    }
    return int_slice
}

func Find_index_of_string_in_slice( s string, slice []string) int {
    for i, val := range slice {
        if val == s {
            return i
        }
    }
    return -1
}
