Code.require_file("utils.exs")

defmodule Solvers do
  def decendants(cooldown, remainingDays) when remainingDays - cooldown > 0 do
    q =
      Enum.to_list((cooldown + 1)..remainingDays//7)
      |> Enum.reduce(0, fn e, acc ->
        decendants(8, remainingDays - e) + acc
      end)

    q + 1
  end

  def decendants(_, _) do
    1
  end

  # partOne algorithm was to slow for part two, but im keeping it here anyway.
  def partOne(data, days) do
    Enum.reduce(data, 0, fn fish, acc ->
      decendants(fish, days) + acc
    end)
  end

  def partTwo(data, days) do
    data = Enum.map(data, fn val -> val + 1 end)

    # How many fishes can a fish spawned on day x spawn itself
    spawnMap =
      Enum.to_list(days..0)
      |> Enum.reduce([], fn day, acc ->
        if days - day > 0, do: [floor((days - day) / 7) + 1 | acc], else: [1 | acc]
      end)

    # find number of granchildren spawned for every fish spawned at x
    spawnMap =
      Enum.to_list((length(spawnMap) - 1)..0)
      |> Enum.reduce(spawnMap, fn index, acc ->
        childs =
          Enum.to_list(0..(Enum.at(spawnMap, index) - 1))
          |> Enum.reduce(Enum.at(spawnMap, index), fn fishNr, ac ->
            spawnDay = index + fishNr * 7 + 9

            if length(acc) > spawnDay,
              do: Enum.at(acc, spawnDay) + ac,
              else: 0 + ac
          end)

        List.update_at(acc, index, fn _ -> childs end)
      end)

    Enum.reduce(data, 0, fn fish, acc ->
      rem = days - fish
      childs = if rem > 0, do: floor(rem / 7) + 1, else: 0

      fishXchild =
        Enum.to_list(0..(childs - 1))
        |> Enum.reduce(childs, fn child, ac ->
          spawnDay = fish + child * 7 + 9

          if length(spawnMap) > spawnDay,
            do: ac + Enum.at(spawnMap, spawnDay),
            else: ac
        end)

      fishXchild + acc
    end) + length(data)
  end
end

data = Enum.at(Utils.readLinesAsIntLists("input", ","), 0)
result = Solvers.partOne(data, 80)
IO.puts(result)
result = Solvers.partTwo(data, 256)
IO.inspect(result)
