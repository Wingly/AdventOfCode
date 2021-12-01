Code.require_file("utils.exs")

defmodule Solvers do
  def partOne(data) do
    Enum.reduce(data, {0, Enum.at(data, 0)}, fn element, acc ->
      if elem(acc, 1) < element, do: {elem(acc, 0) + 1, element}, else: {elem(acc, 0), element}
    end)
  end

  def partTwo(data) do
    data
    |> Enum.chunk_every(3, 1)
    |> Enum.filter(fn x -> length(x) == 3 end)
    |> Enum.map(fn x -> Enum.sum(x) end)
    |> partOne()
  end
end

data = Utils.readLinesAsInt("input")
result = Solvers.partOne(data)
IO.puts("=result=")
IO.puts(elem(result, 0))
result = Solvers.partTwo(data)
IO.puts("=result=")
IO.puts(elem(result, 0))
