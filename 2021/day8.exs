Code.require_file("utils.exs")

defmodule Solvers do
  def partOne(data) do
    Enum.reduce(data, 0, fn line, acc ->
      numbers = String.split(Enum.at(line, 1), " ")

      Enum.reduce(numbers, 0, fn num, ac ->
        n = String.length(num)
        if Enum.any?([2, 3, 4, 7], fn x -> x == n end), do: ac + 1, else: ac
      end) + acc
    end)
  end

  # There is probably a more "algorithmical" solution to this, but this was fun
  def partTwo(data) do
    Enum.reduce(data, 0, fn line, bigAcc ->
      nums = Enum.at(line, 1)
      line = Enum.at(line, 0) |> String.split(" ")

      one = Enum.find(line, fn ele -> String.length(ele) == 2 end)
      seven = Enum.find(line, fn ele -> String.length(ele) == 3 end)
      four = Enum.find(line, fn ele -> String.length(ele) == 4 end)
      eight = Enum.find(line, fn ele -> String.length(ele) == 7 end)

      six =
        Enum.find(line, fn ele ->
          String.length(ele) == 6 and
            !(String.split(one, "") |> Enum.all?(fn e -> String.contains?(ele, e) end))
        end)

      nine =
        Enum.find(line, fn ele ->
          String.length(ele) == 6 and
            String.split(four, "") |> Enum.all?(fn e -> String.contains?(ele, e) end)
        end)

      zero =
        Enum.find(line, fn ele ->
          String.length(ele) == 6 and
            ele != nine and ele != six
        end)

      three =
        Enum.find(line, fn ele ->
          String.length(ele) == 5 and
            String.split(one, "") |> Enum.all?(fn e -> String.contains?(ele, e) end)
        end)

      topRightSignal =
        String.split(one, "", trim: true) |> Enum.find(fn ele -> String.contains?(six, ele) end)

      two =
        Enum.find(line, fn ele ->
          String.length(ele) == 5 and !String.contains?(ele, topRightSignal)
        end)

      five =
        Enum.find(line, fn ele ->
          String.length(ele) == 5 and ele != two and ele != three
        end)

      map = %{
        Utils.sortString(zero) => "0",
        Utils.sortString(one) => "1",
        Utils.sortString(two) => "2",
        Utils.sortString(three) => "3",
        Utils.sortString(four) => "4",
        Utils.sortString(five) => "5",
        Utils.sortString(six) => "6",
        Utils.sortString(seven) => "7",
        Utils.sortString(eight) => "8",
        Utils.sortString(nine) => "9"
      }

      number =
        String.to_integer(
          String.split(nums, " ", trim: true)
          |> Enum.reduce("", fn ele, acc -> "#{acc}#{map[Utils.sortString(ele)]}" end)
        )

      bigAcc + number
    end)
  end
end

data = Utils.readLinesAsStringLists("input", " | ")
result = Solvers.partOne(data)
IO.puts("=result=")
IO.inspect(result)
result = Solvers.partTwo(data)
IO.puts("=result=")
IO.inspect(result)
