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
public class run_Scraper
{
  public static class Contest
  {
    public STATE s;
    public String attributes;

    public Contest(STATE init, String aInit)
    {
      this.s = init;
      this.attributes = aInit;
    }
  }

  enum STATE {
    NOGOOD, BRONZE, SILVER, GOLD, PLATINUM
  }

  static final int MAXIM_SEARCH_QUERY = 1400; // this value should be updated (increased) as more contests is addd, due
                                              // to the cpid growing
  static final int MINIM_SEARCH_QUERY = 84;
  static final long TIME_LIMIT_ON_HOLD = 10L;
  static final int[] QUERY_LIST = { 1, 2, 3, 4 };
  static final String QUERY_DELIMITER_QUERY_ID = "&x83";
  static final String CPID_DELIMITER = "#x83";
  static final String ATTRIBUTES_DELIMITER = "$25x*"; // not bytes to minimize conflicts with the reader in JavaScript
  static final String URL_QUERY = "http://www.usaco.org/index.php?page=viewproblem" + QUERY_DELIMITER_QUERY_ID
      + "&cpid=" + CPID_DELIMITER;

  public static Contest parse(int cpid, int arg)
  {
    Document dc = Jsoup.parse(readURL(formatURL(cpid, arg)));
    Elements p = dc.select(".panel > h2:nth-child(1)");
    Elements p2 = dc.select(".panel > h2:nth-child(2)");
    return parseAttributes(cpid, p.text(), p2.text());
  }

  public static Contest parseAttributes(int cpid, String hw1, String hw2)
  {
    if ((!hw1.startsWith("USACO 20") && !hw1.endsWith("Division")))
    {
      return new Contest(STATE.NOGOOD, null);
    }
    String dateMaxim = hw1.split(" ")[1];
    String monthMaxim = !hw1.split(" ")[2].equals("US") ? hw1.split(" ")[2] : hw1.split(" ")[2] + hw1.split(" ")[3];

    String qN = hw2.split(" ", 3)[0] + hw2.split(" ", 3)[1];
    String pName = hw2.split(" ", 3)[2];
    pName = pName.replace(" ", ATTRIBUTES_DELIMITER);

    return new Contest(cpid <= 139 ? (!hw1.startsWith("USACO 20") && !hw1.endsWith("Division") ? STATE.NOGOOD
        : (hw1.endsWith("Bronze Division") ? STATE.BRONZE
            : (hw1.endsWith("Gold Division") ? STATE.GOLD
                : (hw1.endsWith("Silver Division") ? STATE.SILVER
                    : (hw1.endsWith("Platinum Division") ? STATE.PLATINUM : STATE.NOGOOD)))))
        : (!hw1.startsWith("USACO 20")
            && !(matches(hw1.split(" ")[hw1.split(" ").length - 1], "Bronze", "Gold", "Silver", "Platinum"))
                ? STATE.NOGOOD
                : (hw1.endsWith("Bronze") ? STATE.BRONZE
                    : (hw1.endsWith("Gold") ? STATE.GOLD
                        : (hw1.endsWith("Silver") ? STATE.SILVER
                            : (hw1.endsWith("Platinum") ? STATE.PLATINUM : STATE.NOGOOD))))),
        dateMaxim + " " + monthMaxim + " " + qN + " " + pName);
  }

  public static boolean matches(String str, String... args)
  {
    for (String t : args)
    {
      if (t.equals(str))
        return true;
    }
    return false;
  }

  public static String readURL(String url)
  {
    StringBuilder sb = new StringBuilder();
    String curr = "";
    try (BufferedReader br = new BufferedReader(new InputStreamReader(new URL(url).openStream())))
    {
      sb.append(br.readLine());
      while (curr != null)
      {
        curr = br.readLine();
        sb.append("\n").append(curr);
      }
    } catch (Exception e)
    {
      if (e.getMessage().contains("403"))
        System.out.print("");
      else
        e.printStackTrace();
    }
    return sb.toString();
  }

  public static String formatURL(int cpid, int arg)
  {
    String str = URL_QUERY;
    return str.replace(CPID_DELIMITER, cpid + "").replace(QUERY_DELIMITER_QUERY_ID, arg + "");
  }

  public static void main(String... args) throws Exception
  {
    out.println("Quering for: " + URL_QUERY);
    File f = new File("bin/scraper.txt");
    out.println(f.getAbsolutePath());
    if (!f.exists())
      f.createNewFile();
    else if (f.exists())
    {
      f.delete();
      f.createNewFile();
    }
    try (PrintWriter pw = new PrintWriter(f))
    {
      for (int i = MINIM_SEARCH_QUERY; i <= MAXIM_SEARCH_QUERY; i++)
      {
        search_loop: for (int j = 0; j < QUERY_LIST.length; j++)
        {
          Contest s = parse(i, QUERY_LIST[j]);
          if (s.s != STATE.NOGOOD)
          {
            pw.println(formatURL(i, QUERY_LIST[j]) + " " + s.s.name() + " " + s.attributes);
            pw.flush();
            out.println("[#] ACC: " + i + " " + QUERY_LIST[j] + " | " + s.attributes.split(ATTRIBUTES_DELIMITER)[0]);
            break search_loop;
          }
          else
          {
            out.println("[.] DNE: " + i + " " + QUERY_LIST[j]);
          }
          Thread.sleep(TIME_LIMIT_ON_HOLD);
        }
      }
    }
  }
}
