package jackmeng;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import static java.lang.System.out;

public class Parser {
  static String ATTRIBUTES_DELIMITER;
  static int MAXIM, MINIM;

  static final int NOV = 11,
      DEC = 12, USOPEN = 4, MAR = 3, JAN = 1, FEB = 2;

  public static String parse2(String line) {
    String[] split = line.split(" ");
    return "{ \"url\":\"" + split[0] + "\", \"div\":\"" + split[1] + "\",\n\"year\":\""
        + split[2] + "\",\n\"month\": \"" + getMonth(line) + "\",\n\"qnum\":\"" + split[4] + "\",\n\"name\":\""
        + split[5].replace(ATTRIBUTES_DELIMITER, " ") + "\"},";
  }

  public static int getYear(String line) {
    return Integer.parseInt(line.split(" ")[1]);
  }

  public static int getMonth(String line) {
    String r = line.split(" ")[3];
    return r.contains("Nov") ? NOV
        : r.contains("Jan") ? JAN
            : r.contains("Open") ? USOPEN
                : r.contains("Dec") ? DEC : r.contains("Mar") ? MAR : r.contains("Feb") ? FEB : -1;
  }

  public static String getURL(String line) {
    return line.split(" ")[0];
  }

  public static String getCPID(String line) {
    return line.split(" ")[0].split("cpid=")[1];
  }

  public static String parseMonthName(String str) {
    str = str.toLowerCase();
    return str.startsWith("jan") ? "jan"
        : str.startsWith("feb") ? "feb" : str.startsWith("uso") ? "opn" : str.startsWith("mar") ? "mar" : str.startsWith("dec") ? "dec" : str
            .startsWith("nov") ? "nov" :"jan";
  }

  public static String parseDivName(String str) {
    str = str.toLowerCase();
    return str.startsWith("bro") ? "brnz"
        : str.startsWith("silv") ? "silv" : str.startsWith("plat") ? "plat" : str.startsWith("gol") ? "gold" : "brnz";
  }

  public static String parseQNum(String str) {
    return str.contains("3") ? "3" : str.contains("4") ? "4" : str.contains("1") ? "1" : str.contains("2") ? "2" : "1";
  }

  public static String getID(String line) {
    return line.split(" ")[2] + parseMonthName(line.split(" ")[3]) + parseDivName(line.split(" ")[1])
        + parseQNum(line.split(" ")[4]);
  }

  /**
   * Required arguments for the parser to work
   *
   * @param args args:1 Minim args2:Maxim args3:Attributes_Delimiter
   * @throws Exception
   */
  public static void main(String... args) throws Exception {
    if (args.length == 0) {
      MINIM = Scraper.MINIM_SEARCH_QUERY;
      MAXIM = Scraper.MAXIM_SEARCH_QUERY;
      ATTRIBUTES_DELIMITER = Scraper.ATTRIBUTES_DELIMITER;
    } else {
      MINIM = Integer.parseInt(args[0]);
      MAXIM = Integer.parseInt(args[1]);
      ATTRIBUTES_DELIMITER = args[2];
    }
    if (new File("bin/rnd.json").exists()) {
      File f = new File("bin/rnd.json");
      f.delete();
      f.createNewFile();
    }
    if (new File("bin/urls.json").exists()) {
      File f = new File("bin/urls.json");
      f.delete();
      f.createNewFile();
    }
    if (new File("bin/map_master.json").exists()) {
      File f = new File("bin/map_master.json");
      f.delete();
      f.createNewFile();
    }
    if (new File("bin/map_slave.json").exists()) {
      File f = new File("bin/map_slave.json");
      f.delete();
      f.createNewFile();
    }
    try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("bin/scraper.txt")));
        PrintWriter pw2 = new PrintWriter("bin/rnd.json");
        PrintWriter urls = new PrintWriter("bin/urls.json");
        PrintWriter cpids = new PrintWriter("bin/cpids.json");
        PrintWriter mapm = new PrintWriter("bin/map_master.json");
        PrintWriter maps = new PrintWriter("bin/map_slave.json");) {
      pw2.println("[\n");
      urls.println("[\n");
      cpids.println("[\n");
      mapm.println("{\n");
      maps.println("{\n");
      String curr = br.readLine();
      pw2.println(parse2(curr));
      pw2.flush();
      urls.println("\"" + getURL(curr) + "\",");
      urls.flush();
      cpids.println(getCPID(curr) + ",");
      cpids.flush();
      mapm.println("\"" + getID(curr) + "\":" + "\"" + getCPID(curr) + "\",");
      mapm.flush();
      maps.println("\"" + getCPID(curr) + "\":" + parse2(curr));
      maps.flush();
      while (curr != null) {
        curr = br.readLine();
        if (curr != null) {
          pw2.println(parse2(curr));
          pw2.flush();
          urls.println("\"" + getURL(curr) + "\",");
          urls.flush();
          cpids.println(getCPID(curr) + ",");
          cpids.flush();
          mapm.println("\"" + getID(curr) + "\":" + "\"" + getCPID(curr) + "\",");
          mapm.flush();
          maps.println("\"" + getCPID(curr) + "\":" + parse2(curr));
          maps.flush();
        }
      }
      pw2.println("\n]");
      urls.println("\n]");
      cpids.println("\n]");
      mapm.println("\n}");
      maps.println("\n}");
    }

  }
}
