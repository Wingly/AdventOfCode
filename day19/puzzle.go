package main

import (
    "fmt"
    "../utils"
)

func main() {
	expression_list := utils.Readlines_as_string_array("testinput2")
	fmt.Println(expression_list)
}