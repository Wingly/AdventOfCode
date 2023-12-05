function hello (hi)
  print(hi)
end

function read_lines(file)
    local lines = {}
    for line in io.lines(file) do
        lines[#lines+1] = line
    end
    return lines
end

function readall(filename)
    local fh = assert(io.open(filename, "rb"))
    local contents = assert(fh:read(_VERSION <= "Lua 5.2" and "*a" or "a"))
    fh:close()
    return contents
  end

function hasValue(array, value)
    for _, v in ipairs(array) do
        if v == value then
            return true
        end
    end
    return false
end

function printArray(array)
    local arrStr = ''
    for _, val in ipairs(array) do
        arrStr = arrStr..'  '..tostring(val)
    end
    print(arrStr)
end

function print2DArray(array)

    for _, arr in ipairs(array) do
        printArray(arr)
    end
end

function inBounds(value, bounds)
    if value >= bounds[1] and value <= bounds[2] then
        return true
    end
    return false
end