package main

import (
    "fmt"
    "../utils"
    "strconv"
    "strings"
)

func calculate_expression(expression []string) (int, int) {
    prev_nr,_ := strconv.Atoi(expression[0])
    index := 0
    for index +1 < len(expression) {
        sign := expression[index]
        if sign == "(" {
            nr, internal_size := calculate_expression(expression[index+1:])
            prev_nr += nr
            index += internal_size + 1
        }
        if _, err := strconv.Atoi(sign); err != nil {
            nr2 := 0
            if  expression[index+1]  == "(" {
                nr, internal_size := calculate_expression(expression[index+2:])
                nr2 = nr
                index += internal_size + 2
            } else {
                nr2,_ = strconv.Atoi(expression[index+1])
            }
            switch sign {
                case "+":
                    prev_nr += nr2
                case "*":
                    prev_nr *= nr2                    
                case ")":
                    return prev_nr, index
            }
        }
        index++
    }
    return prev_nr, index
}

func part1(expression_list []string) {
    tot := 0
    for _, expression := range expression_list {
        expression = strings.ReplaceAll(expression, " ", "")
        result, _ := calculate_expression(strings.Split(expression, ""))
        tot += result
        //fmt.Println(calculate_expression(strings.Split(expression, "")))
    }
    fmt.Println(tot)
}

func handle_addition(expression[] string) []string {
    new_expression := []string{}
    index := 0
    for index < len(expression) {
        sign := expression[index]
        if sign == "+" {
            nr1, _ := strconv.Atoi(new_expression[len(new_expression)-1])
            nr2, _ := strconv.Atoi(expression[index+1])
            new_expression[len(new_expression)-1] = strconv.Itoa(nr1 + nr2)
            index+=2
        } else {
            new_expression = append(new_expression, expression[index])
            index++
        }
    }
    return new_expression
}

func handle_multiplication(expression[] string) []string {
    new_expression := []string{}
    index := 0
    for index < len(expression){
        sign := expression[index]
        if sign == "*" {
            nr1, _ := strconv.Atoi(new_expression[len(new_expression)-1])
            nr2, _ := strconv.Atoi(expression[index+1])
            new_expression[len(new_expression)-1] = strconv.Itoa(nr1 * nr2)
            index+=2
        } else {
            new_expression = append(new_expression, expression[index])
            index++
        }
    }

    return new_expression
}

func handle__parenthesis(expression []string) (string, int){
    //check for internal parantheses
    index := 0
    new_expression := []string{}
    for index < len(expression) {
        sign := expression[index]
        if sign == "(" {
            calculated_paranthesis, i := handle__parenthesis(expression[index+1:])
            new_expression = append(new_expression, calculated_paranthesis)
            index += i +1
        } else if sign == ")" {
            break
        } else {
            new_expression = append(new_expression, sign)
        } 
        index++
    }
    new_expression = handle_addition(new_expression)
    new_expression = handle_multiplication(new_expression)

    return new_expression[0], index
}

func part2(expression_list []string) {
    tot := 0
    for _, expression := range expression_list {
        expression := strings.Split(strings.ReplaceAll(expression, " ", ""), "")
        index :=0
        new_expression := []string{}
        for index < len(expression) {
            sign := expression[index]

            if sign!= "(" {
                new_expression = append(new_expression, sign)
            } else {
                calculated_paranthesis, i := handle__parenthesis(expression[index +1:])
                new_expression = append(new_expression, calculated_paranthesis)
                index += i +1
            }
            index++
        }

        new_expression = handle_addition(new_expression)
        new_expression = handle_multiplication(new_expression)
        value, _ := strconv.Atoi(new_expression[0])
        tot += value
    }
    fmt.Println(tot)
}

func main() {
    expression_list := utils.Readlines_as_string_array("input")
    part1(expression_list)
    part2(expression_list)
}