defmodule Utils do
  def readLinesAsStrings(filename) do
    String.split(File.read!(filename), "\n")
  end

  def readLinesAsInt(filename) do
    list = readLinesAsStrings(filename)
    Enum.map(list, fn element -> elem(Integer.parse(element), 0) end)
  end
end
