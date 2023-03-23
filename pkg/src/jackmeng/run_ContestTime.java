package jackmeng;

import java.io.*;
import java.net.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

// CSS-SELECTOR_PATH:
public class run_ContestTime
{

  static final String USACO_URL = "http://www.usaco.org/";

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
      e.printStackTrace();
    }
    return sb.toString();
  }

  public static void main(String... args) throws Exception
  {
    Document dc = Jsoup.parse(readURL(USACO_URL));
    Elements schedule = dc.select(".content > div:nth-child(5) > div:nth-child(3)");
    try (PrintWriter pw = new PrintWriter("bin/usaco.json"))
    {
      pw.println("{\n\"schedule\":\""
          + schedule.html().replace("<br>", "\\n").replace("<h2>", "**").replace("</h2>", "**\\n") + "\"\n}");
      pw.flush();
    }
  }
}
