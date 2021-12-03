Code.require_file("utils.exs")

defmodule Solvers do
  def movement(command) do
    case Enum.at(command, 0) do
      "forward" -> {String.to_integer(Enum.at(command, 1)), 0}
      "up" -> {0, -String.to_integer(Enum.at(command, 1))}
      "down" -> {0, String.to_integer(Enum.at(command, 1))}
    end
  end

  def partOne(data) do
    Enum.reduce(data, {0, 0}, fn element, acc ->
      move = movement(element)
      {elem(acc, 0) + elem(move, 0), elem(acc, 1) + elem(move, 1)}
    end)
  end

  def partTwo(data) do
    Enum.reduce(data, {0, 0, 0}, fn element, acc ->
      move = movement(element)
      aim = elem(move, 1) + elem(acc, 2)
      {elem(acc, 0) + elem(move, 0), elem(acc, 1) + elem(move, 0) * aim, aim}
    end)
  end
end

data = Utils.readLinesAsStringLists("input", " ")
result = Solvers.partOne(data)
IO.puts(elem(result, 0) * elem(result, 1))

result = Solvers.partTwo(data)
IO.puts(elem(result, 0) * elem(result, 1))
