package com.secondhand.web.dto.requset;

import com.secondhand.domain.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JoinRequest {
    //    @Pattern(regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", message = "올바른 이메일 형식이 아닙니다.")
//    @NotNull(message = "이메일은 필수 입력 항목입니다.")
    @Email(message = "유효하지 않은 이메일 형식입니다.",
            regexp = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")
    private String memberEmail;
    @NotBlank(message = "이름을 작성해주세요.")
    private String nickName;
    @NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
    private String password;

    public Member toEntity() {
        return Member.create(nickName, memberEmail, "GENERAL");
    }
}
