package utils

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

func Int_in_slice(element int, slice []int) bool {
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

