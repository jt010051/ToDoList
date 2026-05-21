package com.project.todolist.service;

import java.util.ArrayList;
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
	private final ItemService itemServe;
	@Override
	public ListOfItems createList(String name) {
		ListOfItems list = new ListOfItems(null, name, false, new ArrayList<>());
		repository.save(list);
		return list;
	}

	@Override
	public ListOfItems getList(String listName) {
		
		return repository.findByListName(listName);
	}

	@Override
	public List<ListOfItems> getAllLists() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public void addToList(String item, String listName) {
		
		try {
			Item i = itemServe.getItem(item);
			if(i == null)
				i = itemServe.createItem(item);
			ListOfItems list = repository.findByListName(listName);
			list.getThisList().add(i);
			repository.save(list);
			
		}
		catch(Exception e) {
			
		}
	}
	@Override
	public void deleteFromList(String item, String listName) {
		
		try {
			Item i = itemServe.getItem(item);
	
			ListOfItems list = repository.findByListName(listName);

			for(int j = 0; j < list.getThisList().size(); j++) {
				if(list.getThisList().get(j) == i) {
					list.getThisList().remove(j);
					break;
				}
					
			}
			itemServe.deleteItem(item);

			repository.save(list);
			
		}
		catch(Exception e) {
			
		}
	}

	@Override
	public void deleteList(String listName) {
			try {
				ListOfItems list = repository.findByListName(listName);
				for(Item item : list.getThisList()) {
					deleteFromList(listName, item.getItemName());
				}
				
			}
			catch(Exception e) {
				log.info(e.toString());
			}
	}

	@Override
	public void markItemComplete(String listName, String item) {
		
		try {
			ListOfItems list = repository.findByListName(listName);
			itemServe.markItem(item);
			
			for(Item it : list.getThisList()) {
				if(it.getItemName() == item) {
					it.setComplete(!it.isComplete());
					break;
				}
			}
			repository.save(list);
			
		}
		catch(Exception e) {
			
		}		
	}

}
