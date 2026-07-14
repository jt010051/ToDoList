package com.project.todolist.service;

import java.util.List;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;

public interface ListService {
	ListOfItems createList(String name);
	ListOfItems getList(Long id);
	List<ListOfItems> getAllLists();

	void editList(ListOfItems list);


	void markList(Long id);
	void deleteList(Long id);
}
