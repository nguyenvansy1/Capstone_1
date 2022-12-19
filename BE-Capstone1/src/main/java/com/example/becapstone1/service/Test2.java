package com.example.becapstone1.service;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

public class Test2 {
    public static void test(){
        try {
            List<String> string1 = new ArrayList<>();
            string1.add("a");
            string1.add("b");
            string1.add("c");
            string1.add("d");
            string1.add("e");
            List<String> string2 = new ArrayList<>();
            string2.add("b");
            string2.add("a");
            string2.add("a");
            int count = 0;
            for (int i = 0 ; i < string1.size(); i++) {
                for (int j =0 ; j < string2.size();j++) {
                    if (string1.get(i).equals(string2.get(j))) {
                        count++;
                        string2.remove(j);
                        break;
                    }
                }
                if (count == 3){
                    break;
                }
            }
            if (count == 3) {
                System.out.println("true");
            } else {
                System.out.println("fail");
            }
        } catch (Exception e) {

            System.out.println("Loi" + e.getMessage());
        }

    }
    public static void main(String[] args) {
        test();
    }
}
