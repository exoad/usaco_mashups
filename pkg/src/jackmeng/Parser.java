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

  /**
   * Parses the formatted line into a JSON element
   * with the leading key being the line number
   * found.
   *
   * @param line
   * @return
   */
  public static String parse1(int lNum, String line) {
    String[] split = line.split(" ");
    return "\"q_" + Math.abs(lNum) + " \": { \"url\":\"" + split[0] + "\", \"year\":" + split[1] + ",\n\"month\":\""
        + split[2] + "\",\n\"qnum\":\""
        + split[3] + "\",\n\"qname\": \"" + split[4].replace(ATTRIBUTES_DELIMITER, " ") + "\"},";
  }

  public static String parse2(String line) {
    String[] split = line.split(" ");
    return "{ \"url\":\"" + split[0] + "\", \"year\":" + split[1] + ",\n\"qnum\":\""
        + split[3] + "\",\n\"qname\": \"" + split[4].replace(ATTRIBUTES_DELIMITER, " ") + "\"},";
  }

  public static int getYear(String line) {
    return Integer.parseInt(line.split(" ")[1]);
  }

  public static int getMonth(String line) {
    String r = line.split(" ")[2];
    return r.contains("Nov") ? NOV
        : r.contains("Jan") ? JAN
            : r.contains("Open") ? USOPEN
                : r.contains("Dec") ? DEC : r.contains("Mar") ? MAR : r.contains("Feb") ? FEB : -1;
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
    if (new File("bin/plat.json").exists()) {
      File f = new File("bin/plat.json");
      f.delete();
      f.createNewFile();
    }
    try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("bin/scraper.txt")));
        PrintWriter pw2 = new PrintWriter("bin/plat.json")) {
      pw2.println("{\n");
      String curr = br.readLine();
          
      pw2.println("\n}");
    }
  }
}
