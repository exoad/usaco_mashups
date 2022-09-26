package jackmeng;

import static java.lang.System.out;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 * This scraper should not be run every time the both
 * is started!!!!
 *
 * Run it every time a contest has ended or updates
 * to the USACO website are made.
 *
 * @author Jack Meng
 * @since 1.0
 */
public class Scraper {
  enum STATE {
    NOGOOD, BRONZE, SILVER, GOLD, PLATINUM
  }

  static final int MAXIM_SEARCH_QUERY = 1238;
  static final int MINIM_SEARCH_QUERY = 84;
  static final long TIME_LIMIT_ON_HOLD = 100L;
  static final int[] QUERY_LIST = { 1, 2, 3, 4 };
  static final String QUERY_DELIMITER_QUERY_ID = "&x83";
  static final String CPID_DELIMITER = "#x83";
  static final String URL_QUERY = "http://www.usaco.org/index.php?page=viewproblem" + QUERY_DELIMITER_QUERY_ID
      + "&cpid=" + CPID_DELIMITER;

  public static STATE parse(int cpid, int arg) {
    Document dc = Jsoup.parse(readURL(formatURL(cpid, arg)));
    Elements p = dc.select(".panel > h2:nth-child(1)");
    return !p.text().startsWith("USACO 20") && !p.text().endsWith("Division") ? STATE.NOGOOD
        : (p.text().endsWith("Bronze Division") ? STATE.BRONZE
            : (p.text().endsWith("Gold Division") ? STATE.GOLD
                : (p.text().endsWith("Silver Division") ? STATE.SILVER
                    : (p.text().endsWith("Platinum Division") ? STATE.PLATINUM : STATE.NOGOOD))));
  }

  public static String readURL(String url) {
    StringBuilder sb = new StringBuilder();
    String curr = "";
    try (BufferedReader br = new BufferedReader(new InputStreamReader(new URL(url).openStream()))) {
      sb.append(br.readLine());
      while (curr != null) {
        curr = br.readLine();
        sb.append("\n").append(curr);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return sb.toString();
  }

  public static String formatURL(int cpid, int arg) {
    String str = URL_QUERY;
    return str.replace(CPID_DELIMITER, cpid + "").replace(QUERY_DELIMITER_QUERY_ID, arg + "");
  }

  public static void main(String... args) throws Exception {
    out.println("Quering for: " + URL_QUERY);
    File f = new File("bin/scraper.txt");
    out.println(f.getAbsolutePath());
    if (!f.exists())
      f.createNewFile();
    else if (f.exists()) {
      f.delete();
      f.createNewFile();
    }
    try (PrintWriter pw = new PrintWriter(f)) {
      for (int i = MINIM_SEARCH_QUERY; i <= MAXIM_SEARCH_QUERY; i++) {
        search_loop: for (int j = 0; j < QUERY_LIST.length; j++) {
          STATE s = parse(i, QUERY_LIST[j]);
          out.println(i + " " + QUERY_LIST[j]);
          if (s != STATE.NOGOOD) {
            pw.println(formatURL(i, QUERY_LIST[j]) + " " + s.name());
            pw.flush();
            out.println("ACCEPTED: " + i + " " + QUERY_LIST[j]);
          } else {
            out.println("DENIED: " + i + " " + QUERY_LIST[j]);
          }
          Thread.sleep(TIME_LIMIT_ON_HOLD);
        }
      }
    }
  }
}