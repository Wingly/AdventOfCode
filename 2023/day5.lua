require "utility"

local input = read_lines('input')

function buildConverterMap(data) 
    local nextIsNewType = false
    local converterMap = {}
    for _, row in ipairs(data) do
        -- must be better way do to 
        if _ ~= 1 then
            if nextIsNewType == true then
                converterMap[#converterMap+1] = {}
            else
                for number in string.gmatch(row, "(%d+)") do
                    table.insert(converterMap[#converterMap], tonumber(number))
                end
            end
            if row == '' then
                nextIsNewType = true
            else
                nextIsNewType = false
            end
        end
    end
    return converterMap
end

function part1(data)
    local seeds = {}
    for str in string.gmatch(input[1], "(%d+)") do
        seeds[#seeds+1] = tonumber(str)
    end
    local converterMap = buildConverterMap(data)
    local retval = 1230103103102123123123;
    for _, seed in ipairs(seeds) do
        local mapNumber = seed
        for _, map in ipairs(converterMap) do
            local index = 1
            while index < #map do
                local orig = map[index]
                local source = map[index+1]
                local length = map[index+2]
                if mapNumber >= source and mapNumber <= source + length then
                    mapNumber = (mapNumber - source) + orig
                    break
                end
                index = index +3
            end
        end
        if mapNumber < retval then
            retval = mapNumber
        end
    end
    return retval
end

function part2(data)
    local seeds = {}
    for str in string.gmatch(input[1], "(%d+)") do
        seeds[#seeds+1] = tonumber(str)
    end
    local converterMap = buildConverterMap(data)

    local index = 1
    local retval = 1230103103102123123123;

    local ranges = {}
    local seedResults = {}
    while index < #seeds do
        ranges = {{seeds[index], seeds[index]+ seeds[index+1]}}
        for _, map in ipairs(converterMap) do
            local nextRanges = {}
            local seedIndex = 1
            while seedIndex <= #ranges do
                local mapIndex = 1
                local range = ranges[seedIndex]

                while mapIndex < #map do
                    local orig = map[mapIndex]
                    local source = map[mapIndex+1]
                    local length = map[mapIndex+2]

                    if range[1] >= source and range[2] <= source+length then
                        table.insert(nextRanges ,{range[1] - source + orig, range[2] - source + orig})
                        range[1] = -1
                        range[2] = -1
                    elseif range[1] <= source and inBounds(range[2], {source, source+length}) then
                        table.insert(nextRanges ,{orig, range[2] - source + orig})
                        range[2] = source-1
                    elseif inBounds(range[1], {source, source+length}) and range[2] >= source+length then
                        table.insert(nextRanges ,{range[1] - source + orig, orig+length})
                        range[1] = source + length +1
                    end

                    mapIndex = mapIndex +3
                end
                if range[1] > -1 and range[2] > -1 then
                    table.insert(nextRanges ,range)
                end
                seedIndex = seedIndex +1
            end

            ranges = nextRanges
        end
        seedResults[#seedResults+1] =ranges
        index = index +2
    end
    for _, results in ipairs(seedResults) do
        for _, range in ipairs(results) do
          if retval > range[1] then
              retval = range[1]
           end
        end
    end
    return retval
end

print(part1(input))

print(part2(input))