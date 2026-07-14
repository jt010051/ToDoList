package com.project.todolist.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;
import com.project.todolist.repository.ItemRepository;
import com.project.todolist.repository.ListRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service @RequiredArgsConstructor @Transactional @Slf4j

public class ListServiceImpl implements ListService {
	private final ListRepository repository;
	
	@Override
	public ListOfItems createList(String name) {
		ListOfItems list = new ListOfItems(null, name, false,
				new ArrayList<>());
		repository.save(list);
		return list;
	}

	@Override
	public ListOfItems getList(Long id) {
			return repository.findById(id).orElseThrow();
	}

	@Override
	public List<ListOfItems> getAllLists() {
		return repository.findAll();
	}

	@Override
	public void deleteList(Long id) {
			try {
				ListOfItems list = repository.findById(id).orElseThrow();

				
				
				repository.delete(list);
			}
			catch(Exception e) {
				log.info(e.toString());
			}
	}

	@Override
	public void markList(Long id) {
		ListOfItems list = repository.findById(id).orElseThrow();

		try {
		list.setListComplete(!list.isListComplete());
		for(Item i : list.getItems()) 
			i.setComplete(true);
		repository.save(list);
		}
		catch(Exception e) {
			log.info(e.toString());

		}
	}

	@Override
	public void editList(ListOfItems list) {
		try {
			
			repository.save(list);
	
		}
		catch(Exception e) {
			
		}
	}

	

}
