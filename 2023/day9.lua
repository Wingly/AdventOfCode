require "utility"

local input = read_lines('input')
 
function isAllZeroes(layer)
    local allZeroes = true
    for _, num in ipairs(layer) do
        if num ~= 0 then
            allZeroes = false
            break
        end
    end
    return allZeroes
end

function generateLayers(layers)
    if isAllZeroes(layers[#layers]) then
        return
    end
    local newLayer = {}
    local lastLayer = layers[#layers]
    for i=1, #lastLayer-1 do
        table.insert(newLayer, lastLayer[i+1] - lastLayer[i])
    end
    table.insert(layers, newLayer)

    generateLayers(layers)
end

function parseData(row) do
    local layers = {}
    for num in string.gmatch(row, '(-?%d+)') do
        if layers[1] == nil then
            layers[1] = {tonumber(num)}
        else
            table.insert(layers[1], tonumber(num))
        end
    end
    return layers
    end
end


function part1(data)
    local retVal = 0
    for _, row in ipairs(data) do
        local layers = parseData(row)
        generateLayers(layers)
        for i=1, #layers-1 do
            local prevLayer = layers[#layers - i+1]
            local curLayer = layers[#layers - i]
            table.insert(curLayer, curLayer[#curLayer] + prevLayer[#prevLayer])
        end

        retVal = retVal + layers[1][#layers[1]]
    end
    return retVal
end

function part2(data)
    local retVal = 0
    for _, row in ipairs(data) do
        local layers = parseData(row)
        generateLayers(layers)
        for i=1, #layers-1 do
            local prevLayer = layers[#layers - i+1]
            local curLayer = layers[#layers - i]
            table.insert(curLayer, 1, curLayer[1] - prevLayer[1])
        end
        retVal = retVal + layers[1][1]
    end
    return retVal
end

print(part1(input))

print(part2(input))