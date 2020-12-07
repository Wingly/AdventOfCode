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