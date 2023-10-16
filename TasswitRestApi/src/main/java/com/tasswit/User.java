package com.tasswit;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	private String cnie;
	private String digitsVerif;
	private String email;
	private boolean hasRight;
	private String password;
	private String phone;
	private int voteId;
	private String votePDF;

	public User() {
	}

	public User(String cnie, String digitsVerif, String email, boolean hasRight, String password, String phone,
			int voteId, String votePDF) {
		super();
		this.cnie = cnie;
		this.digitsVerif = digitsVerif;
		this.email = email;
		this.hasRight = hasRight;
		this.password = password;
		this.phone = phone;
		this.voteId = voteId;
		this.votePDF = votePDF;
	}

	@Id
	public String getCnie() {
		return cnie;
	}

	public void setCnie(String cnie) {
		this.cnie = cnie;
	}

	public String getDigitsVerif() {
		return digitsVerif;
	}

	public void setDigitsVerif(String digitsVerif) {
		this.digitsVerif = digitsVerif;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isHasRight() {
		return hasRight;
	}

	public void setHasRight(boolean hasRight) {
		this.hasRight = hasRight;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public int getVoteId() {
		return voteId;
	}

	public void setVoteId(int voteId) {
		this.voteId = voteId;
	}

	public String getVotePDF() {
		return votePDF;
	}

	public void setVotePDF(String votePDF) {
		this.votePDF = votePDF;
	}

}
