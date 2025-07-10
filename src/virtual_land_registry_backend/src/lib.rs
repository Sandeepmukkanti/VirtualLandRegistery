use candid::{CandidType, Deserialize};
use ic_cdk_macros::{update, query};
use std::cell::RefCell;
use std::collections::HashMap;

type Principal = String;

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Land {
    pub id: String,
    pub title: String,
    pub location: String,
    pub area: String,
    pub price: f64,
    pub description: String,
    pub registration_date: String,
    pub image: String,
    pub owner: Principal,
    pub original_owner: Principal,
    pub status: String,
}

// In-memory storage for all lands
thread_local! {
    static LANDS: RefCell<HashMap<String, Land>> = RefCell::new(HashMap::new());
}

#[update]
fn register_land(land: Land) {
    LANDS.with(|lands| {
        lands.borrow_mut().insert(land.id.clone(), land);
    });
}

#[query]
fn get_all_lands() -> Vec<Land> {
    LANDS.with(|lands| lands.borrow().values().cloned().collect())
}

#[query]
fn get_land_by_id(id: String) -> Option<Land> {
    LANDS.with(|lands| lands.borrow().get(&id).cloned())
}

#[update]
fn update_land_status(id: String, new_status: String) -> bool {
    LANDS.with(|lands| {
        if let Some(land) = lands.borrow_mut().get_mut(&id) {
            land.status = new_status;
            true
        } else {
            false
        }
    })
}

#[update]
fn delete_land(id: String) -> bool {
    LANDS.with(|lands| lands.borrow_mut().remove(&id).is_some())
}

#[update]
fn transfer_ownership(id: String, new_owner: String) -> bool {
    LANDS.with(|lands| {
        if let Some(land) = lands.borrow_mut().get_mut(&id) {
            if land.status == "Listed" {
                land.original_owner = land.owner.clone();
                land.owner = new_owner;
                land.status = "Owned".to_string();
                true
            } else {
                false
            }
        } else {
            false
        }
    })
}
