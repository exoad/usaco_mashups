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
    try (BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("bin/scraper.txt")));
        PrintWriter pw2 = new PrintWriter("bin/rnd.json")) {
      pw2.println("[\n");
      String curr = br.readLine();
      while (curr != null) {
        curr = br.readLine();
        if (curr != null) {
          pw2.println(parse2(curr));
          pw2.flush();
        }
      }
      pw2.println("\n]");
    }
  }
}
