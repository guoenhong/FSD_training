import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GenerateExcel {
    Map<String, List<String>> memberMap1 = new HashMap<String, List<String>>();
    Map<String, List<String>> memberMap2 = new HashMap<String, List<String>>();
    Map<String, List<String>> memberMap3 = new HashMap<String, List<String>>();
    ArrayList<String[]> headList = new ArrayList<String[]>();
    public void generateExcel(ArrayList<Member> arrayList) {
        getMember(arrayList);
        excelTitle();
        String[] strArray = headList.get(0);
        ExcelUtil.createExcel(memberMap1, strArray,0);
        String[] strArray1 = headList.get(1);
        ExcelUtil.createExcel(memberMap2, strArray1,1);
        String[] strArray2 = headList.get(2);
        ExcelUtil.createExcel(memberMap3, strArray2,2);
    }


    private void getMember(ArrayList<Member> arrayList) {
        try {
            for (int i = 0; i < arrayList.size(); i++) {
                ArrayList<String> members1 = new ArrayList<String>();
                members1.add(arrayList.get(i).getYear() + "");
                members1.add(arrayList.get(i).getStartSal()+"");
                members1.add(arrayList.get(i).getIncrementFreq() + "");
                members1.add((arrayList.get(i).getIncrementPer())*100 + "%");
                members1.add(arrayList.get(i).getStartSal()*arrayList.get(i).getIncrementPer() + "");
                memberMap1.put(arrayList.get(i).getYear() + "", members1);

                ArrayList<String> members2 = new ArrayList<String>();
                members2.add(arrayList.get(i).getYear() + "");
                members2.add(arrayList.get(i).getStartSal()+"");
                members2.add(arrayList.get(i).getDeductionsFreq() + "");
                int a = arrayList.get(i).getDeductionsAmount();
                int b =arrayList.get(i).getStartSal();
                members2.add((double)a/b*100 + "%");
                members2.add(arrayList.get(i).getDeductionsAmount() + "");
                memberMap2.put(arrayList.get(i).getYear() + "", members2);

                ArrayList<String> members3 = new ArrayList<String>();
                members3.add(arrayList.get(i).getYear() + "");
                members3.add(arrayList.get(i).getStartSal()+"");
                members3.add(arrayList.get(i).getStartSal()*arrayList.get(i).getIncrementPer() + "");
                members3.add(arrayList.get(i).getDeductionsAmount() +"");
                members3.add(arrayList.get(i).getStartSal()*arrayList.get(i).getIncrementPer()-arrayList.get(i).getDeductionsAmount() + "");
                memberMap3.put(arrayList.get(i).getYear() + "", members3);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void excelTitle() {
        String[] strArray1 = { "Year", "Starting Salary", "Increment Frequent", "Increment%","Increment Amount" };
        String[] strArray2 = { "Year", "Starting Salary", "Deductions Frequent", "Deductions%","Deductions Amount" };
        String[] strArray3= { "Year", "Starting Salary", "Increment Amount", "Deductions Amount","Salary Growth" };
        headList = new ArrayList<String[]>();
        headList.add(strArray1);
        headList.add(strArray2);
        headList.add(strArray3);
    }
}
