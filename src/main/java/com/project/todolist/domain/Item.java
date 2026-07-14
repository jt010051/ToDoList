package com.project.todolist.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString(exclude = "list") 
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)

	private Long  id;
	String itemName;

	boolean complete;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listOfItems_id")
    @JsonBackReference
    private ListOfItems list;


}
