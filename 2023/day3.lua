require "utility"

local input = read_lines('input')
function checkAround(array, x, y)
    local around = {}
    for i = -1, 1 do
        for j = -1, 1 do
            if array[tostring(x + i) ..'-'..tostring(y+j)] ~= nil then
                around[#around+1] = {['type']= array[tostring(x + i) ..'-'..tostring(y+j)], ['pos']= tostring(x + i) ..'-'..tostring(y+j)}
            end
        end
    end
    return around
end

function buildMap(data) 
    local symbols = {}
    local numbers = {}
    for x, line in pairs(data) do
        local y = 1
        local num = ''
        local numYStart = nil
        while y < #line +1 do
            local insertnum = false
            local asnum = tonumber(line:sub(y,y))
            if asnum ~= nil then
                num = num .. tostring(asnum)
                if numYStart == nil then
                    numYStart = y
                end
            elseif line:sub(y,y) == '.' then
                if num ~= '' then
                    insertnum = true
                end
            else
                if num ~= '' then
                  insertnum = true
                end
                symbols[tostring(x) .. '-' .. tostring(y)] = line:sub(y,y)
            end
            if insertnum == true then
                local subnum = {
                    ["value"] = num,
                    ["parts"]= {}
                }
                for i = numYStart, y-1 do
                    table.insert(subnum.parts, {['x']= x, ['y']= i})
                end
                table.insert(numbers, subnum)
                num = ''
                numYStart = nil
            end
            y = y+ 1
        end
        if num ~= '' then
            local subnum = {
                ["value"] = num,
                ["parts"]= {}
            }
            for i = numYStart, y do
                table.insert(subnum.parts, {['x']= x, ['y']= i})
            end
            table.insert(numbers, subnum)
            num = ''
            numYStart = nil
        end
    end
    return {['symbols']=symbols, ['numbers'] = numbers}
end

function part1(data)
    local map = buildMap(data)
    local symbols = map.symbols
    local numbers = map.numbers

    local retval = 0

    for _, num in pairs(numbers) do
        for _, entry in ipairs(num.parts) do
            local totAround = checkAround(symbols, entry.x, entry.y)
            if #totAround > 0 then
                retval = retval + num.value
                break
            end
        end
    end
    return retval

end

function part2(data)
  local map = buildMap(data)
    local symbols = map.symbols
    local numbers = map.numbers

    local retval = 0
    local stars = {}
    for _, num in pairs(numbers) do
        for _, entry in ipairs(num.parts) do
            local totAround = checkAround(symbols, entry.x, entry.y)
            if #totAround > 0 then
                for _, symbol in pairs(totAround) do
                    if symbol.type =='*' then
                        if stars[symbol.pos] == nil then
                            stars[symbol.pos] = {num.value}
                        else 
                            table.insert(stars[symbol.pos], num.value)
                        end
                    end
                end
                break
            end
        end
    end
    for _, num in pairs(stars) do
        if #num == 2 then
            retval = retval + num[1] * num[2]
        end
    end
    return retval
end


print(part1(input))

print(part2(input))