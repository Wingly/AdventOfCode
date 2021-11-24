package main

import (
    "fmt"
    "../utils"
    "strings"
    "sort"
)

type Layer struct {
    id int
    layer_data [][]string
}

func expand_layer(data *[][]string) {
    top_and_bottom := []string{}

    for i := 0; i < len(*data) +2; i++ {
        top_and_bottom = append(top_and_bottom, ".")
    }

    new := [][]string{top_and_bottom}
    
    for _, row := range *data {
        new_row := []string{"."}
        new_row = append(new_row, row...)
        new_row = append(new_row, ".")
        new = append(new, new_row)
        
    }
    new = append(new, top_and_bottom)
    *data = new
}

func count_adjecent_active(x, y int , against [][]string, skip_checking_input_pos bool) int {
    count := 0
    checked := 0
    for i := x - 1; i < x +2; i++ {
        if i < 0 || len(against[0]) <= i {
            continue
        }
        for j := y - 1; j < y +2; j++ {
            if j < 0 || len(against[0]) <= j {
                continue
            }
            if skip_checking_input_pos && i == x && j == y {
                continue
            }
            if against[i][j] == "#" {
                count++
            }
            checked++
        }
    }
    return count
}

func handle_layer(this, above, below Layer) Layer {
    new_layer := Layer{this.id, [][]string{}}
    for row_nr, row := range this.layer_data {
        new_row := []string{}
        for item_nr, cube := range row {
            count_active := 0
            if len(below.layer_data) > 0 {
                count_active = count_adjecent_active(row_nr, item_nr, below.layer_data, false)
            }
            if len(above.layer_data) > 0 {
                count_active += count_adjecent_active(row_nr, item_nr, above.layer_data, false)
            }
            count_active += count_adjecent_active(row_nr, item_nr, this.layer_data, true)
            if cube == "." && count_active == 3{
                new_row = append(new_row, "#")
            } else if cube == "#" && (count_active == 2 || count_active == 3) {
                new_row = append(new_row, "#")
            } else {
                new_row = append(new_row, ".")
            }
        }
        new_layer.layer_data = append(new_layer.layer_data, new_row)
    }

    return new_layer
}

func find_layer(layer_id int, layers []Layer) Layer {
    for _, layer := range layers {
        if layer.id == layer_id {
            return layer
        }
    }
    return Layer{}
}

func need_to_expand(layers []Layer) bool {
    for _, layer := range layers {
        for i, row := range layer.layer_data {
            if row[0] == "#" || row[len(row) -1] == "#" {
                return true
            }
            if (i == 0 || i == len(layers)) && utils.Element_in_slice("#", row) {
                return true
            }

        }
    }
    return false
}

func count_active_in_layer(layer Layer) int {
    count := 0
    for _, row := range layer.layer_data {
        for _, char := range row {
            if char == "#" {
                count++
            }
        }
    }
    return count
}

func find_highest_and_lowest_layer_ids(layers []Layer) (int, int) {
    lowest := int(^uint(0) >> 1)
    highest := -lowest
    for _, layer := range layers {
        if layer.id < lowest {
            lowest = layer.id
        }
        if highest < layer.id {
            highest = layer.id
        }
    }
    return highest, lowest
}

func create_empty_layer(id, size int) Layer {
    empty_layer := Layer{id, [][]string{}}
    empty_layer_data := [][]string{}
    for i := 0; i < size; i++  {
        empty_row := []string{}
        for j := 0; j < size; j++ {
            empty_row = append(empty_row, ".")
        }
        empty_layer_data = append(empty_layer_data, empty_row)
    }
    empty_layer.layer_data = empty_layer_data
    return empty_layer
}

func part1(layer0 Layer) {
    layers := []Layer{layer0}
    
    layers = append(layers, create_empty_layer(-1, len(layer0.layer_data[0])))
    layers = append(layers, create_empty_layer(1, len(layer0.layer_data[0])))

    for i, _ := range layers {
        expand_layer(&layers[i].layer_data)
    } 

    for cycle := 0; cycle < 6; cycle++ {
        new_layers := []Layer{}
        for _, layer := range layers {
            var above, below Layer
            above = find_layer(layer.id +1, layers)
            below = find_layer(layer.id -1, layers)
            new_layers = append(new_layers, handle_layer(layer, above, below))
        }
        if need_to_expand(new_layers) {
            for i, _ := range new_layers {
                expand_layer(&new_layers[i].layer_data)
            }
        }
        highest, lowest := find_highest_and_lowest_layer_ids(new_layers)
        layer_size := len(new_layers[0].layer_data)
        if count_active_in_layer(find_layer(highest, new_layers)) != 0 {
            new_layers = append(new_layers, create_empty_layer(highest +1, layer_size))
        }
        if count_active_in_layer(find_layer(lowest, new_layers)) != 0 {
            new_layers = append(new_layers, create_empty_layer(lowest -1, layer_size))
        }
        layers = new_layers
    }
    // Just for debug
    sort.Slice(layers, func(i,j int) bool { return layers[i].id < layers[j].id})
    for _, layer := range layers {
        fmt.Printf("== %d ==\n", layer.id)
        for _, row := range layer.layer_data {
            fmt.Println(row)
        }
    }
    count := 0
    for _, layer := range layers {
        count += count_active_in_layer(layer)
    }
    fmt.Println(count)
}

func part2(layer0 Layer) {
    
}

func main() {
    initial_state := utils.Readlines_as_string_array("input")
    layer0 := Layer{0, [][]string{}}
    for _, row := range initial_state {
        row_data := strings.Split(row, "")
        layer0.layer_data = append(layer0.layer_data, row_data)
    }
    part1(layer0)
}