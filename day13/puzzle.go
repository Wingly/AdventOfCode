package main

import (
    "fmt"
    "../utils"
    "strconv"
    "strings"
    "sort"
)

func get_bus_ids(data []string) []int{
    ids := []int{}

    for _, element := range data {
        if element != "x" {
            id, _ := strconv.Atoi(element)
            ids = append(ids, id)
        }
    }
    return ids
}

func part1(bus_data []string) {
    earliest_time, _ := strconv.Atoi(bus_data[0])
    answer := 0

    bus_ids := get_bus_ids(strings.Split(bus_data[1], ","))
    for time := earliest_time +1; answer == 0 ; time++ {
        for _, id := range bus_ids {
            if time % id == 0 {
                answer = id * (time - earliest_time)
                break
            }
        }
    }

    fmt.Println(answer)
}

type Bus struct {
    id int64
    time_slot int64
}

func part2(bus_data []string) {
    buses := []Bus{}
    for i, id := range strings.Split(bus_data[1], ",") {
        if id == "x" {
            continue
        }
        bus_id, _ := strconv.ParseInt(id, 10, 64)
        buses = append(buses, Bus{bus_id, int64(i)})
    }
    sort.Slice(buses, func(i,j int) bool {
        return buses[i].id > buses[j].id
    })
    original_first_index := 0
    //set time_slot for each bus to be relative to the least frequent bus
    for i := 1; i < len(buses); i++ {
        if buses[i].time_slot == 0 {
            original_first_index = i
        }
        buses[i].time_slot = buses[i].time_slot - buses[0].time_slot
    }
    buses[0].time_slot = 0
    first_common := buses[0].id
    matching_increment := buses[0].id
    first := int64(0)
    for i := 1; i < len(buses) ; i++ {
        for j := first_common; ; j+= matching_increment {
            if (j + buses[i].time_slot) % buses[i].id == 0{
                if first == 0 && i != len(buses) -1 {
                    first = j
                } else if i == len(buses) -1 {
                    first_common = j
                    break
                }else {
                    matching_increment = j - first
                    first_common = j
                    first= 0
                    break
                }
            }  
        }
    }

    fmt.Println(first_common + buses[original_first_index].time_slot)

}

func main() {
    bus_data := utils.Readlines_as_string_array("input")
    part1(bus_data)
    part2(bus_data)
}