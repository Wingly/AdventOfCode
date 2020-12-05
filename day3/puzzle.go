package main

import (
    "../utils"
    "fmt"
)

func traverse_map(forest_map []string, speed []int) int{
    var num_trees int
    row_length := len(forest_map[0])
    x_speed := speed[0]
    y_speed := speed[1]
    x_pos := 0
    for idx, row := range forest_map {
        if idx == 0 || idx % y_speed != 0 {
            continue
        }
        x_pos += x_speed
        if string(row[x_pos % row_length]) == "#" {
            num_trees += 1
        }
    }
    return num_trees
}

func part1(forest_map []string) {
    speed := []int{3,1}
    fmt.Println(traverse_map(forest_map, speed))
}

func part2(forest_map []string) {
    speeds := [][]int{
                    []int{1,1}, 
                    []int{3,1},
                    []int{5,1},
                    []int{7,1},
                    []int{1,2}}
    answer := 1
    for _, speed := range speeds {
        answer *= traverse_map(forest_map, speed)
    }
    fmt.Println(answer)
}

func main() {
    forest_map := utils.Readlines_as_string_array("input")
    if forest_map == nil {
        return
    }
    part1(forest_map)
    part2(forest_map)
}