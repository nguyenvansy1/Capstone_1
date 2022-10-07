package com.example.becapstone1.model;

import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        int[][] s = {
                {9,2},
                {12,1}
        };
        Integer[] arr = new Integer[12];
        for (int i = 1 ; i<=12; i++){
            for(int row = 0; row < s.length; row++) {
                for(int column = 0; column < s[row].length-1; column++) {
                    if (i == s[row][column]) {
                        arr[i-1] = s[row][column];
                    }
                }
            }
        }
        for (int i = 0 ; i<12; i++) {
            if (arr[i] == null){
                arr[i] = 0;
            }
        }
    }
}
