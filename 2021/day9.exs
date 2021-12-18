Code.require_file("utils.exs")

defmodule Solvers do
  def read2d(arr, i, j) do
    Enum.at(Enum.at(arr, i), j)
  end

  def findNeighbours(arr, y, x) do
    up = if y > 0, do: read2d(arr, y - 1, x), else: nil
    down = if y < length(arr) - 1, do: read2d(arr, y + 1, x), else: nil
    left = if x > 0, do: read2d(arr, y, x - 1), else: nil
    right = if x < length(Enum.at(arr, 0)) - 1, do: read2d(arr, y, x + 1), else: nil

    [up, down, left, right]
  end

  def partOne(data) do
    lowPoints =
      data
      |> Stream.with_index()
      |> Enum.reduce([], fn {line, y}, outer ->
        lowInLine =
          Stream.with_index(line)
          |> Enum.reduce([], fn {ele, x}, inner ->
            higherNeighbours =
              findNeighbours(data, y, x)
              |> Enum.reduce(0, fn neighbour, ac ->
                if neighbour == nil or neighbour > ele, do: ac + 1, else: ac
              end)

            if higherNeighbours == 4, do: [ele | inner], else: inner
          end)

        [lowInLine | outer]
      end)

    List.flatten(lowPoints) |> Enum.reduce(0, fn ele, acc -> acc + ele + 1 end)
  end

  def partTwo(data) do
  end
end

data = Utils.readLinesAsIntLists("input", "")
result = Solvers.partOne(data)
IO.puts("=result=")
IO.inspect(result)
result = Solvers.partTwo(data)
IO.puts("=result=")
