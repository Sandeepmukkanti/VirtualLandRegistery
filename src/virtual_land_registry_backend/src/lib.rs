use candid::{CandidType, Deserialize};
use ic_cdk_macros::{update, query, pre_upgrade, post_upgrade};
use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::storage::{stable_save, stable_restore};

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

// Persistent in-memory storage
thread_local! {
    static LANDS: RefCell<HashMap<String, Land>> = RefCell::new(HashMap::new());
}

#[pre_upgrade]
fn pre_upgrade() {
    let lands = LANDS.with(|lands| lands.borrow().clone());
    stable_save((lands,)).expect("Failed to save state before upgrade");
}

#[post_upgrade]
fn post_upgrade() {
    let (saved_lands,): (HashMap<String, Land>,) = stable_restore().expect("Failed to restore state after upgrade");
    LANDS.with(|lands| *lands.borrow_mut() = saved_lands);
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
