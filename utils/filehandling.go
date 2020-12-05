package utils

import (
    "os"
    "bufio"
    "fmt"
    "strconv"
)

func Readlines_as_string_array(fileName string) []string  {
    file, err := os.Open(fileName)
    if err != nil {
        fmt.Println("bad file?")
        return nil
    }
    defer file.Close()
    scanner := bufio.NewScanner(file)
    string_array := []string{}
    for scanner.Scan() {
        string_array = append(string_array, scanner.Text())
    }
    return string_array
}

func Readlines_as_int_array(fileName string) []int64  {
    file, err := os.Open(fileName)
    if err != nil {
        fmt.Println("bad file?")
        return nil
    }
    defer file.Close()
    scanner := bufio.NewScanner(file)
    int_array := []int64{}
    for scanner.Scan() {
        int_value, _ := strconv.ParseInt(scanner.Text(), 10, 32)
        int_array = append(int_array, int_value)
    }
    return int_array
}