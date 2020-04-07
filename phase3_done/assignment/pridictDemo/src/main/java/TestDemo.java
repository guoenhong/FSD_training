import java.awt.image.Kernel;
import java.util.ArrayList;
import java.util.HashMap;

public class TestDemo {

    public static void main(String[] args) {
        GenerateExcel generateExcel = new GenerateExcel();
        ArrayList<Member> arrayList = new ArrayList<Member>();
        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        member1.setYear(1);
        member1.setStartSal(1000);
        member1.setIncrementPer(0.1);
        member1.setIncrementFreq("annually");
        member1.setDeductionsAmount(10);
        member1.setDeductionsFreq("annually");

        member2.setYear(2);
        member2.setStartSal(2000);
        member2.setIncrementPer(0.1);
        member2.setIncrementFreq("annually");
        member2.setDeductionsAmount(50);
        member2.setDeductionsFreq("annually");

        member3.setYear(3);
        member3.setStartSal(2000);
        member3.setIncrementPer(0.1);
        member3.setIncrementFreq("annually");
        member3.setDeductionsAmount(50);
        member3.setDeductionsFreq("annually");
        arrayList.add(member1);
        arrayList.add(member2);
        arrayList.add(member3);
        generateExcel.generateExcel(arrayList);
    }
}
