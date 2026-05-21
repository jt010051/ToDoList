package com.project.todolist.domain;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ListOfItems {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long  id;
	private String listName;
	private boolean listComplete;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "this_list",
	joinColumns = @JoinColumn(name = "list_id"),
	inverseJoinColumns = @JoinColumn(name = "item_id"))
	List<Item> thisList;
}
