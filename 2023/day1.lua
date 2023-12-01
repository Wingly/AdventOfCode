require "utility"

local input = read_lines('input')

function part1(data)
    local retval = 0
    for _, v in pairs(data) do
        local n = {}
        for w in string.gmatch(v, "%d") do
            n[#n + 1] = w
        end
        local calib = tostring(n[1]) .. tostring(n[#n])
        retval = retval + calib
    end
    return retval
end

function part2(data)
    local numbers = {'one', 'two','three','four','five','six','seven','eight','nine', 1,2,3,4,5,6,7,8,9}
    local retval = 0
    for _, v in pairs(data) do
        local n = {}
        for i, pat in pairs(numbers) do
            local start = 0
            while true do
                local first, last = string.find(v, pat, start)
                if first ~= nil then
                    if first == last then
                        n[#n +1] = {first, pat}
                    else
                        n[#n +1] = {first, i}
                    end
                    start = first+1
                else
                    break    
                end 
            end
        end
        table.sort(n, function (left, right) return left[1] < right[1] end)
        local calib = tostring(n[1][2]) .. tostring(n[#n][2])
        retval = retval + calib
    end
    return retval
end

print(part1(input))

print(part2(input))