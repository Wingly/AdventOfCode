require "utility"

local input = read_lines('testinput')

function generateLayers(layers)
    table.insert(layers, {"os"})

end

function part1(data)
    printArray(data)
    for _, row in ipairs(data) do
        local layers = {
        }
        for num in string.gmatch(row, '(%d+)') do
            if layers[1] == nil then
                layers[1] = {num}
            else
                table.insert(layers[1], num)
            end
        end
        print2DArray(layers)
        generateLayers(layers)
        print2DArray(layers)

    end
end

function part2(data)
  
end

print(part1(input))

print(part2(input))