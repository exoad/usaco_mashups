package jackmeng.samples;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class run_Parser
{

  public static class Quad< A >
  {
    public List< A > first;
    public List< A > second;
    public List< A > third;
    public List< A > fourth;

    public Quad(final int def_size)
    {
      first = new ArrayList<>(def_size);
      second = new ArrayList<>(def_size);
      third = new ArrayList<>(def_size);
      fourth = new ArrayList<>(def_size);
    }
  }

  static String ATTRIBUTES_DELIMITER;
  static int MAXIM, MINIM;

  static final int NOV = 11, DEC = 12, USOPEN = 4, MAR = 3, JAN = 1, FEB = 2;

  public static String parse2_v1(String line, boolean is_last)
  {
    String[] split = line.split(" ");
    return ("{ \"url\":\"" +
        split[0] +
        "\", \"div\":\"" +
        split[1] +
        "\",\n\"year\":\"" +
        split[2] +
        "\",\n\"month\": \"" +
        getMonth(line) +
        "\",\n\"qnum\":\"" +
        split[4] +
        "\",\n\"name\":\"" +
        split[5].replace(ATTRIBUTES_DELIMITER, " ") +
        "\"},");
  }

  public static String getDivision(String line)
  {
    return line.split(" ")[1];
  }

  public static int getYear(String line)
  {
    return Integer.parseInt(line.split(" ")[1]);
  }

  public static int getMonth(String line)
  {
    String r = line.split(" ")[3];
    return r.contains("Nov")
        ? NOV
        : r.contains("Jan")
            ? JAN
            : r.contains("Open")
                ? USOPEN
                : r.contains("Dec")
                    ? DEC
                    : r.contains("Mar") ? MAR : r.contains("Feb") ? FEB : -1;
  }

  public static String getURL(String line)
  {
    return line.split(" ")[0];
  }

  public static String getCPID(String line)
  {
    return line.split(" ")[0].split("cpid=")[1];
  }

  public static String parseMonthName(String str)
  {
    str = str.toLowerCase();
    return str.startsWith("jan")
        ? "jan"
        : str.startsWith("feb")
            ? "feb"
            : str.startsWith("uso")
                ? "opn"
                : str.startsWith("mar")
                    ? "mar"
                    : str.startsWith("dec")
                        ? "dec"
                        : str.startsWith("nov") ? "nov" : "jan";
  }

  public static String parseDivName(String str)
  {
    str = str.toLowerCase();
    return str.startsWith("bro")
        ? "brnz"
        : str.startsWith("silv")
            ? "silv"
            : str.startsWith("plat")
                ? "plat"
                : str.startsWith("gol") ? "gold" : "brnz";
  }

  public static String parseQNum(String str)
  {
    return str.contains("3")
        ? "3"
        : str.contains("4")
            ? "4"
            : str.contains("1") ? "1" : str.contains("2") ? "2" : "1";
  }

  public static String getID(String line)
  {
    return (line.split(" ")[2] +
        parseMonthName(line.split(" ")[3]) +
        parseDivName(line.split(" ")[1]) +
        parseQNum(line.split(" ")[4]));
  }

  public static void removeLastComma(String fileName) throws IOException
  {
    String outputFileName = fileName + ".tmp";
    try (BufferedReader reader = new BufferedReader(new FileReader(fileName));
        PrintWriter writer = new PrintWriter(new FileWriter(outputFileName)))
    {
      String line = null;

      while ((line = reader.readLine()) != null)
        writer.println(line);
    }

    try (BufferedReader reader = new BufferedReader(new FileReader(outputFileName));
        PrintWriter writer = new PrintWriter(new FileWriter(fileName)))
    {
      String line = null;
      while ((line = reader.readLine()) != null)
      {
        if (line.trim().endsWith(","))
          line = line.trim().substring(0, line.trim().length() - 1);
        writer.println(line);
      }
    }

    new File(outputFileName).delete();
  }

  /**
   * Required arguments for the parser to work
   *
   * @param args
   *          args:1 Minim args2:Maxim args3:Attributes_Delimiter
   * @throws Exception
   */
  public static void main(String... args) throws Exception
  {
    if (args == null || args.length == 0)
    {
      MINIM = 84;
      MAXIM = 1238;
      ATTRIBUTES_DELIMITER = "$25x*";
    }
    else
    {
      MINIM = Integer.parseInt(args[0]);
      MAXIM = Integer.parseInt(args[1]);
      ATTRIBUTES_DELIMITER = args[2];
    }
    if (new File("bin/rnd.json").exists())
    {
      File f = new File("bin/rnd.json");
      f.delete();
      f.createNewFile();
    }
    if (new File("bin/urls.json").exists())
    {
      File f = new File("bin/urls.json");
      f.delete();
      f.createNewFile();
    }
    if (new File("bin/map_master.json").exists())
    {
      File f = new File("bin/map_master.json");
      f.delete();
      f.createNewFile();
    }
    if (new File("bin/map_slave.json").exists())
    {
      File f = new File("bin/map_slave.json");
      f.delete();
      f.createNewFile();
    }
    if (new File("bin/qType.json").exists())
    {
      File f = new File("bin/qType.json");
      f.delete();
      f.createNewFile();
    }
    try (
        BufferedReader br = new BufferedReader(
            new InputStreamReader(new FileInputStream("bin/scraper.txt")));
        PrintWriter pw2 = new PrintWriter("bin/rnd.json");
        PrintWriter urls = new PrintWriter("bin/urls.json");
        PrintWriter cpids = new PrintWriter("bin/cpids.json");
        PrintWriter mapm = new PrintWriter("bin/map_master.json");
        PrintWriter maps = new PrintWriter("bin/map_slave.json");
        PrintWriter qType = new PrintWriter("bin/qType.json"))
    {
      /**
       * divQs.first -> Platinum
       * divQs.second -> Gold
       * divQs.third -> Silver
       * divQs.fourth -> Bronze
       */
      Quad< String > divQs = new Quad<>(10);

      pw2.println("[\n");
      urls.println("[\n");
      cpids.println("[\n");
      mapm.println("{\n");
      maps.println("{\n");
      qType.println("{\n");
      String curr = br.readLine();
      pw2.println(parse2_v1(curr, false));
      pw2.flush();
      urls.println("\"" + getURL(curr) + "\",");
      urls.flush();
      cpids.println(getCPID(curr) + ",");
      cpids.flush();
      mapm.println("\"" + getID(curr) + "\":" + "\"" + getCPID(curr) + "\",");
      mapm.flush();
      maps.println("\"" + getCPID(curr) + "\":" + parse2_v1(curr, false));
      maps.flush();
      if (parseDivName(getDivision(curr)).equals("plat"))
      {
        divQs.first.add(getID(curr));
      }
      else if (parseDivName(getDivision(curr)).equals("brnz"))
      {
        divQs.fourth.add(getID(curr));
      }
      else if (parseDivName(getDivision(curr)).equals("silv"))
      {
        divQs.third.add(getID(curr));
      }
      else if (parseDivName(getDivision(curr)).equals("gold"))
      {
        divQs.second.add(getID(curr));
      }
      while (curr != null)
      {
        curr = br.readLine();
        if (curr != null)
        {
          pw2.println(parse2_v1(curr, false));
          urls.println("\"" + getURL(curr) + "\",");
          cpids.println(getCPID(curr) + ",");
          mapm.println(
              "\"" + getID(curr) + "\":" + "\"" + getCPID(curr) + "\",");
          maps.println("\"" + getCPID(curr) + "\":" + parse2_v1(curr, false));
          if (parseDivName(getDivision(curr)).equals("plat"))
          {
            divQs.first.add(getID(curr));
          }
          else if (parseDivName(getDivision(curr)).equals("brnz"))
          {
            divQs.fourth.add(getID(curr));
          }
          else if (parseDivName(getDivision(curr)).equals("silv"))
          {
            divQs.third.add(getID(curr));
          }
          else if (parseDivName(getDivision(curr)).equals("gold"))
          {
            divQs.second.add(getID(curr));
          }
        }
      }

      pw2.println("\n]");
      urls.println("\n]");
      cpids.println("\n]");
      mapm.println("\n}");
      maps.println("\n}");

      qType.println("\"plat\":\n[");
      for (int i = 0; i < divQs.first.size(); i++)
      {
        if (i != divQs.first.size() - 1)
        {
          qType.println("\"" + divQs.first.get(i) + "\",\n");
        }
        else
        {
          qType.println("\"" + divQs.first.get(i) + "\"");
        }
      }
      qType.println("\n],");
      qType.println("\"gold\":\n[");
      for (int i = 0; i < divQs.second.size(); i++)
      {
        if (i != divQs.second.size() - 1)
        {
          qType.println("\"" + divQs.second.get(i) + "\",\n");
        }
        else
        {
          qType.println("\"" + divQs.second.get(i) + "\"");
        }
      }
      qType.println("\n],");
      qType.println("\"silv\":\n[");
      for (int i = 0; i < divQs.third.size(); i++)
      {
        if (i != divQs.third.size() - 1)
        {
          qType.println("\"" + divQs.third.get(i) + "\",\n");
        }
        else
        {
          qType.println("\"" + divQs.third.get(i) + "\"");
        }
      }
      qType.println("\n],");
      qType.println("\"brnz\":\n[");
      for (int i = 0; i < divQs.fourth.size(); i++)
      {
        if (i != divQs.fourth.size() - 1)
        {
          qType.println("\"" + divQs.fourth.get(i) + "\",\n");
        }
        else
        {
          qType.println("\"" + divQs.fourth.get(i) + "\"");
        }
      }
      qType.println("\n]");
      qType.println("\n}");
      qType.flush();
    }

    // for (String e : new String[] { "bin/cpids.json", "bin/map_master.json",
    // "bin/map_slave.json", "bin/qType.json",
    // "bin/rnd.json", "bin/urls.json" })
    // removeLastComma(e);
  }
}
