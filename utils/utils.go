package utils

func Is_in_range(min int64, max int64, value int64) bool {
	return min <= value && value <= max
}