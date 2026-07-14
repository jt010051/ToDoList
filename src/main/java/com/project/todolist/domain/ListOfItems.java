package com.project.todolist.domain;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    @OneToMany(mappedBy = "list", 
    		cascade = CascadeType.ALL, 
    		fetch = FetchType.LAZY)
    @JsonManagedReference
	private List<Item> items;

	
//	@ElementCollection(fetch = FetchType.EAGER)
//    @MapKeyColumn(name = "item") // Column containing the HashMap keys
//    @Column(name = "item_isComplete")     // Column containing the HashMap values
//	Map<Item, Boolean> itemComplete;
}
