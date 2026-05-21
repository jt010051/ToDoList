package com.project.todolist.service;

import java.util.List;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;

public interface ListService {
	ListOfItems createList(String name);
	ListOfItems getList(String listName);
	List<ListOfItems> getAllLists();
	void addToList(String listName,  String item);
	void markItemComplete(String listName,  String item);

	void deleteList(String listName);
	void deleteFromList(String listName, String item);
}
