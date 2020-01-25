package com.aktheraja.matrix4;

import org.junit.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class EmailValidatorTest {
    final EmailValidator underTest = new EmailValidator();
    @Test
    public void itShouldValidateCorrectEmail(){
        assertThat(underTest.test("hello@gmail.com")).isTrue();
    }
    @Test
    public void itShouldValidateAnIncorrectEmail(){
        assertThat(underTest.test("hellogmail.com")).isFalse();
    }
    @Test
    public void itShouldValidateAnIncorrectEmailWithoutDotAtTheEnd(){
        assertThat(underTest.test("hello@gmail")).isFalse();
    }
}
